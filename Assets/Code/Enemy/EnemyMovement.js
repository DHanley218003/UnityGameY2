#pragma strict
// objects (SET IN INSPECTOR!)
var waypoints:GameObject[];
var rb:GameObject;
// booleans
var debug:boolean = true;
// integers
var direction:float;
var speed:int = 5; // enemy speed
@HideInInspector
var T:int; // time to intercept
@HideInInspector
var RVMag:int; // relative velocity magnitude
@HideInInspector
var magnitude:int; // relative distance
@HideInInspector
var state:int = 0;
@HideInInspector
var tolerence:float = 0.1;
@HideInInspector
var patternIndex : int = 0;
// vectors
@HideInInspector
var pAngle:Vector2; // gets vector player
@HideInInspector
var normalised:Vector2; // normalised vector to player
@HideInInspector
var playerVelocity:Vector2; // players velocity
@HideInInspector
var predictedPosition:Vector2; // predicted position of player
@HideInInspector
var previousPosition:Vector2; // last position of enemy
@HideInInspector
var currentVelocity:Vector2; // current enemy velocity
@HideInInspector
var relativeVelocity:Vector2; // relative velocity of enemy to player
@HideInInspector
var currentPosition:Vector3;
@HideInInspector
var moveVector:Vector3;


function Start ()
{
	rb = GameObject.Find("Guy");
	playerVelocity = rb.transform.position; // set initlial value for calculations
    previousPosition = transform.position; // set initial value for calculations
	currentPosition = this.transform.position;
}

function Update () 
{
	
	predict(); // predicts where the player will be
	if (state == 0)	
		Patrol();	
	else if (state == 1)
		Attack(); // moves to predicted location
		
	playerVelocity = rb.transform.position; // reset for next time
    previousPosition = transform.position; // reset for next time
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject == "Guy")
	{
		GameObject.Find("Main Camera").GetComponent(scoreSheet).hit();
		Destroy(this.gameObject);
	}
}

function predict() // predicts where the player will be
{
	playerVelocity = (rb.transform.position - playerVelocity) / Time.deltaTime;// gets the players velocity
	currentVelocity = transform.position - previousPosition; // gets the enemys velocity
	if(debug)
		Debug.DrawRay(rb.transform.position, playerVelocity, Color.green); // Players predicted path
	
	relativeVelocity = playerVelocity - currentVelocity; // gets the relative velocity
	RVMag = relativeVelocity.magnitude; // need the magnitude of relative velocity for division to get T
	
	if(magnitude != 0) // prevent divide by 0 errors
		T = RVMag / magnitude; // Time equals relative velocity divded by relative distance
	
	predictedPosition = rb.transform.position + playerVelocity * T; // Predicts and goes to the predicted player position
	
    
    pAngle = transform.position; // set to enemy position for calculating
	pAngle =  predictedPosition - pAngle; // gets vector to player
	
	magnitude = pAngle.magnitude; // distance to player
	
	if(magnitude != 0) 
		normalised = pAngle/magnitude; // normalised vector to player (used to control speed)
	direction = Vector2.Angle(normalised, transform.up);
	if(direction >= -30 && direction <= 30)
	{
		if(magnitude < 20)
			state = 1;
	}
	if(debug)
	{	
		Debug.DrawRay(transform.position, pAngle, Color.red); // draws a ray from the current object position to the vector
		Debug.DrawRay(transform.position, normalised, Color.black); // draws normalised ray of the vector
	}
}

function Attack() 
{
    transform.position += normalised * speed * Time.deltaTime; // move towards player
    if(magnitude > 20)
    	state = 0;
}

function Patrol()
{
	currentPosition = this.transform.position;
	// Process the current instruction in our control data array
	moveVector = waypoints[patternIndex].transform.position - currentPosition; // get the vector to the waypoint
	if(debug)
		Debug.DrawRay(transform.position, moveVector, Color.black); // confirm it's the right point.
	magnitude = moveVector.magnitude; // distance to the waypoint
	
	if(magnitude != 0) // No one likes to divide by zero!
		moveVector = moveVector / magnitude;
	
	
	transform.position += moveVector * speed * Time.deltaTime; // move towards waypoint
	
	if(magnitude < tolerence * speed * Time.deltaTime) // if distance to waypoint is less than our tolerance, go to next waypoint
	{
		patternIndex++;	
	}
	if(patternIndex >= waypoints.Length) // out of waypoints, start from beginning
	{
		patternIndex = 0;
	}
}

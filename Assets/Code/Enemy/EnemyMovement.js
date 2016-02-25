#pragma strict
// objects (SET IN INSPECTOR!)
var rb:GameObject;
var player:Rigidbody2D; // player object
// booleans
var debug:boolean = true;
// integers
var speed:int = 5; // enemy speed
var T:int; // time to intercept
var RVMag:int; // relative velocity magnitude
var magnitude:int; // relative distance
// vectors
var pAngle:Vector2; // gets vector player
var normalised:Vector2; // normalised vector to player
var playerVelocity:Vector2; // players velocity
var predictedPosition:Vector2; // predicted position of player
var previousPosition:Vector2; // last position of enemy
var currentVelocity:Vector2; // current enemy velocity
var relativeVelocity:Vector2; // relative velocity of enemy to player

function start ()
{
	playerVelocity = player.position; // set initlial value for calculations
    previousPosition = transform.position; // set initial value for calculations
    player = GameObject.Find("Guy").GetComponent.<Rigidbody2D>();
    //player = rb.GetComponent.<Rigidbody2D>();
    var Movement : Movement = FindObjectOfType(Movement);
}

function Update () 
{
	predict(); // predicts where the player will be
	Attack(); // moves to predicted location
}

function predict() // predicts where the player will be
{
	playerVelocity = (player.position - playerVelocity) / Time.deltaTime;// gets the players velocity
	currentVelocity = transform.position - previousPosition; // gets the enemys velocity
	if(debug)
		Debug.DrawRay(player.position, playerVelocity, Color.green); // Players predicted path
	
	relativeVelocity = playerVelocity - currentVelocity; // gets the relative velocity
	RVMag = relativeVelocity.magnitude; // need the magnitude of relative velocity for division to get T
	
	if(magnitude != 0) // prevent divide by 0 errors
		T = RVMag / magnitude; // Time equals relative velocity divded by relative distance
	
	predictedPosition = player.position + playerVelocity * T; // Predicts and goes to the predicted player position
	
	playerVelocity = player.position; // reset for next time
    previousPosition = transform.position; // reset for next time
    
    pAngle = transform.position; // set to enemy position for calculating
	pAngle =  predictedPosition - pAngle; // gets vector to player
	 
	magnitude = pAngle.magnitude; // distance to player
	normalised = pAngle/magnitude; // normalised vector to player (used to control speed)
	if (magnitude < 2)
	{
		Destroy(this.gameObject);
		player.GetComponent(Movement).hit();
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
}
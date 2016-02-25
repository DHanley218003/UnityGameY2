#pragma strict

public class ControlData
{
	public function ControlData(x:Vector3)
	{
		waypoint = x;
	}
	public var waypoint:Vector3;
}

@HideInInspector
var pattern : ControlData[];
var tolerence:float = 0.1;
var patternIndex : int = 0;
var currentPosition:Vector3;
var moveVector:Vector3;
var magnitude:float;

var debug:boolean = true;
var speed : float = 3;

function Start () 
{
	var point1:ControlData = ControlData(Vector3(0,0,0));
	
	var point2:ControlData = ControlData(Vector3(15,0,0));
	
	var point3:ControlData = ControlData(Vector3(15,15,0));
	
	var point4:ControlData = ControlData(Vector3(0,15,0));
	
	pattern = [point1, point2, point3, point4];
	currentPosition = this.transform.position;
}

function Update () 
{
	currentPosition = this.transform.position;
	// Process the current instruction in our control data array
	var cd : ControlData = pattern[patternIndex]; // get current waypoint to work with
	moveVector = cd.waypoint - currentPosition; // get the vector to the waypoint
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
	if(patternIndex >= pattern.Length) // out of waypoints, start from beginning
	{
		patternIndex = 0;
	}
}
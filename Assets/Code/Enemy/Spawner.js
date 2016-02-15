#pragma strict
var Enemy:GameObject;

function Update () 
{
	var teleport:Vector2 = Random.Range(0, 15);
	Instantiate(Enemy, teleport.position, teleport.rotation);
}
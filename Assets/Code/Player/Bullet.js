#pragma strict
var boundingBox:int = 100;

function Update () 
{
	if(transform.position.x > boundingBox || transform.position.x < -boundingBox || transform.position.y > boundingBox || transform.position.y < -boundingBox);
}

function OnCollisionEnter(collision:Collision)
{
	Destroy(collision.gameObject);
	Destroy(this.gameObject);
}
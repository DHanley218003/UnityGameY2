#pragma strict
var target:GameObject;
var pAngle:Vector2;
var magnitude:int;
var boundingBox:int = 100;

function Start()
{
	target = GameObject.Find("Enemy(Clone)");
}

function Update () 
{
	pAngle = target.transform.position - transform.position;
	magnitude = pAngle.magnitude;
	if(magnitude < 2)
	{
		Destroy(target.gameObject);
		Destroy(this.gameObject);
	}
	if(transform.position.x > boundingBox || transform.position.x < -boundingBox || transform.position.y > boundingBox || transform.position.y < -boundingBox)
		Destroy(this.gameObject);
}
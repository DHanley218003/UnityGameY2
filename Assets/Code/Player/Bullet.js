#pragma strict
var boundingBox:int = 100;

function Update () 
{
	if(transform.position.x > boundingBox || transform.position.x < -boundingBox || transform.position.y > boundingBox || transform.position.y < -boundingBox);
	{
		//Destroy(this.gameObject);
	}
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.name == "Enemy(Clone)")
	{
		Destroy(col.gameObject);
		GameObject.Find("Main Camera").GetComponent(scoreSheet).kill();
		Destroy(this.gameObject);
	}
}
#pragma strict
var style:GUIStyle;

function Start () 
{
	style.name = "HUD";
	style.normal.textColor = Color.black;
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject == "Guy")
	{
		GameObject.Find("Main Camera").GetComponent(scoreSheet).winGame();
	}
}
#pragma strict
var health:int = 100;
var score:int = 0;
var style:GUIStyle;

function Start()
{
	style.name = "HUD";
	style.normal.textColor = Color.black;
}

function OnGUI()
{
	GUI.Label(Rect(10,10,100,20), "Score: " + score.ToString(), style);
	GUI.Label(Rect(10,20,100,20), "Health: " + health.ToString(), style);
}

function hit()
{
	health -= 1;
	if(health < 0)
	{
		var player:GameObject = GameObject.Find("Guy");
		Destroy(player);
	}
}

function kill()
{
	score += 25;
}
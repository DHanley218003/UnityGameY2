#pragma strict
var health:int = 100;
var score:int = 0;
var win:boolean = false;
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
	if(win)
	{
		GUI.Label(Rect(10,10,100,20), "You Win!", style);
		Time.timeScale = 0;
	}
	else if(health <= 0)
	{
		GUI.Label(Rect(10,10,100,20), "You Lost...", style);
		Time.timeScale = 0;
	}
}

function hit()
{
	health -= 25;
	if(health < 0)
	{
		var player:GameObject = GameObject.Find("Guy");
		Destroy(player);
	}
}

function heal()
{
	health = 100;
}
function kill()
{
	score += 25;
}
function winGame()
{
	win = true;
}
#pragma strict

public class SpawnData
{
	public var moveX : float;
}
var Enemy:GameObject;

@HideInInspector
var pattern : SpawnData[];
var location:Vector2 = Vector2(0,0);
var xSpawn:float = 0f;
var ySpawn:float = 0f;
var x:int = 0;

function Start () 
{
	var pdr : SpawnData = SpawnData();
	pdr.moveX = 1.0f;
	
	pattern = [pdr, pdr, pdr, pdr, pdr, pdr, pdr, pdr, pdr, pdr];
	
	for(var i:int = 0; i < 30; i++)
	{
		Instantiate(Enemy, location, transform.rotation);
		xSpawn += pattern[x].moveX;
		location = Vector2(xSpawn,ySpawn);
		x++;
		if(x >= 5)
		{
			ySpawn--;
			xSpawn = 0;
			x = 0;
		}		
	}	
}
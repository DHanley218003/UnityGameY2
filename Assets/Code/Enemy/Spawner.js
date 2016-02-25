#pragma strict
var Enemy:GameObject;

InvokeRepeating("spawn", 1.0, 5.0);

function spawn()
{
	var teleport:Vector2 = Vector2(Random.Range(0, 90), Random.Range(0, 90));
	Instantiate(Enemy, teleport, transform.rotation);
}
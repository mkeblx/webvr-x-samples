/*
CubeSea for three.js
*/

// lit : lambert or flat material
// merge : merge geometry into single mesh
function CubeSea( gridSize, cubeSize, lit, merge ) {
	var sea = new THREE.Object3D();

	new THREE.TextureLoader().load( 'media/textures/cube-sea.png', function( map ){

	var _geo = new THREE.Geometry();
	var geo = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
	var mat = new (lit ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial)({
		map: map
	});
	if (!merge)
		var _cube = new THREE.Mesh( geo, mat );

	for ( var x = 0; x < gridSize; ++x ) {
		for ( var y = 0; y < gridSize; ++y ) {
			for ( var z = 0; z < gridSize; ++z ) {
				var position = new THREE.Vector3( x - gridSize/2, y - gridSize/2, z - gridSize/2 );
				if ( position.x == 0 && position.y == 0 && position.z == 0 )
					continue;

				if (!merge) {
					var cube = _cube.clone();
					cube.position.copy( position );
					sea.add( cube );
				} else {
					_geo.merge( geo, new THREE.Matrix4().makeTranslation( position.x, position.y, position.z ) );
				}
			}
		}
	}

	if (merge) {
		var _cubes = new THREE.Mesh( _geo, mat );
		sea.add( _cubes );
	}

	});

	return sea;
}

import * as THREE from '../build/three.module.js';

			import { DDSLoader } from '../examples/jsm/loaders/DDSLoader.js';
			import { MTLLoader } from '../examples/jsm/loaders/MTLLoader.js';
			import { OBJLoader } from '../examples/jsm/loaders/OBJLoader.js';

			let camera, scene, renderer, object, mash;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;


			init();
			animate();


			function init() {

				container = document.getElementById( 'canvas_threejs' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 0;

				
				const background_image = new THREE.TextureLoader().load( "/textures/kandao3.jpg");
				const textureEquirec = new THREE.TextureLoader().load( "examples/textures/kandao3.jpg");

				textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
				textureEquirec.encoding = THREE.sRGBEncoding;


				// scene

				scene = new THREE.Scene();
				scene.background = background_image

				const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 1 );
				camera.add( pointLight );
				scene.add( camera );

				// model

				const onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};

				const onError = function () { };

				const manager = new THREE.LoadingManager();
				manager.addHandler( /\.dds$/i, new DDSLoader() );

				// comment in the following line and import TGALoader if your asset uses TGA textures
				// manager.addHandler( /\.tga$/i, new TGALoader() );

				mash = new MTLLoader( manager )
					.setPath( 'examples/obj/MNO-3_original_2M_OBJ_1_0/' )
					.load( 'mno3jm.mtl', function ( materials ) {
						
						materials.preload();

						new OBJLoader( manager )
							// .setMaterials( materials)
							.setPath( 'examples/obj/MNO-3_original_2M_OBJ_1_0/' )
							.load( 'mno3jm.obj', function ( object ) {

								object.position.y = 50;
								object.position.z = 40;

								object.children[0].material.color.r = 0.3;
								object.children[0].material.color.g = 0.9;
								object.children[0].material.color.b = 0.55;

								// object.children[0].material.specular.r = 0;
								// object.children[0].material.specular.g = 0;
								// object.children[0].material.specular.b = 0;

								object.children[0].material.roughness = 0.1;
								object.children[0].material.metalness = 1;

								object.children[0].material.envMap = textureEquirec;
								object.children[0].material.flatShading = true;

								// object.children[0].material.wireframe = true;



								console.log(object.children[0]);
								scene.add( object );
								

							}, onProgress, onError );

					} );



				const Mat2 = new THREE.MeshPhongMaterial( { 
						color: "#00ffe1",
						emissive: "#000000",
						// wireframe: true,
						// vortexColor: true,
						roughness: 0.1,
						metalness: 0.9,
						});


				renderer = new THREE.WebGLRenderer( { alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				
				renderer.setClearColor( 0x000000, 0 );


				document.addEventListener( 'mousemove', onDocumentMouseMove );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {
				requestAnimationFrame( animate );
				render();

			}

			function render() {
				object = scene.children[2]
				// camera.position.x += ( mouseX - camera.position.x ) * .05;
				// camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}
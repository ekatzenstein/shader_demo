    var container = document.getElementById('threeDiv');
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(1 / -2, 1 / 2, 1 / 2, 1 / -2, -10, 10);
    var plane = new THREE.PlaneBufferGeometry(1, 1);

    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;

    //create texture loader
    var texLoader = new THREE.TextureLoader();
    //set cross origin is necessary for this demo (we haven't setup a server), be sure to use wikimedia images
    texLoader.setCrossOrigin( 'Anonymous');
    //define path to texture and load
    var imgUrlA = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/ISS-32_American_EVA_b3_Aki_Hoshide.jpg/1280px-ISS-32_American_EVA_b3_Aki_Hoshide.jpg"

    var texture = texLoader.load(imgUrlA)

    var material = new THREE.ShaderMaterial({
        //uniforms are a very powerful part of shaders, allowing us to define parameters on the fly for both vertex and fragment shaders.
        uniforms: {
            texture: {
                type: 't',
                value: texture
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    var planeMesh = new THREE.Mesh(plane, material);
    scene.add(planeMesh);
    //renderer.render(scene, camera); //this is to render once, we want to render repeatedly so we're going to do the below instead
    animate();

    function animate(){
        requestAnimationFrame(animate); //this keeps the loop going
        render();
    }

    function render(){
        renderer.render(scene, camera); //now we plug in the render function
    }
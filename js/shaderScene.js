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
    var imgUrlA = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/ISS-32_American_EVA_b3_Aki_Hoshide.jpg/1280px-ISS-32_American_EVA_b3_Aki_Hoshide.jpg" //spaceman

    var imgUrlB = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/%D0%9F%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D1%8F%D1%89%D0%B8%D0%B9_%D0%BF%D1%83%D1%87%D0%BE%D0%BA_Pteridium_aquilinum.JPG/1280px-%D0%9F%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D1%8F%D1%89%D0%B8%D0%B9_%D0%BF%D1%83%D1%87%D0%BE%D0%BA_Pteridium_aquilinum.JPG" //cells

    var imgUrlC = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Aiga_drinkingfountain_inv.svg/613px-Aiga_drinkingfountain_inv.svg.png"; //spiral gradient

    var texture = texLoader.load(imgUrlA)
    var texture2 = texLoader.load(imgUrlB)
    var texture3 = texLoader.load(imgUrlC)

    var time = 0; //initialize time value
    var timeAdd = true; //intially ascending

    var mousePositionX = 0; //intialize mouse position;
    var material = new THREE.ShaderMaterial({
        uniforms: {
            texture: {
                type: 't',
                value: texture
            },
            texture2: {
                type: 't',
                value: texture2
            },
            texture3: {
                type: 't',
                value: texture3
            },
            time: { //adding time variable
                type: 'f',
                value: time
            },
            mouseX: { //adding time variable
                type: 'f',
                value: mousePositionX
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    var planeMesh = new THREE.Mesh(plane, material);
    scene.add(planeMesh);
    animate();

    document.onmousemove=function(e){
        material.uniforms.mouseX.value = e.clientX/window.innerWidth;
    }

    function animate(){
        requestAnimationFrame(animate);
        render();
    }

    function render(){
        //logic to pulsate time
        if(time >= 1){
            timeAdd=false;
        }
        else if(time<=0){
            timeAdd = true;
        }
        if(timeAdd){
            time=time+.02;
        }
        else{
            time=time-.02;
        }
        material.uniforms.time.value=time;
        renderer.render(scene, camera);
    }
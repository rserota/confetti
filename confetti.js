var rockets = []
var particles = []
const gravity = -.00005
function launchRocket(){
    var launchTime = performance.now()
    var startVelocityY = ((Math.random() * .03) - .015 ) + .07
    var startVelocityX = ((Math.random() * .02) - .01 )
    var startPositionX = (((Math.random() * 6) - 3 )+50)
    var spinSpeed = (Math.random() -.5)
    var rocketElement = document.createElement('rocket')
    rocketElement.classList.add('rocket')
    document.body.appendChild(rocketElement)
    var rocket = {
        element : rocketElement,
        launchTime : launchTime,
        startVelocityY : startVelocityY,
        startVelocityX : startVelocityX,
        startPositionX : startPositionX,
        spinSpeed      : spinSpeed
    }
    rockets.push(rocket)
    if ( navigator.vibrate ) { navigator.vibrate(200) }
}

function launchParticle(rocket){
    var launchTime = performance.now()
    var startVelocityY = ((Math.random() * .03) - .015 ) + .04
    var startVelocityX = ((Math.random() * .02) - .01 )
    var startPositionX = parseFloat(rocket.element.style.left)
    var startPositionY = parseFloat(rocket.element.style.bottom)
    var particleElement = document.createElement('particle')
    particleElement.classList.add('particle')
    var spinSpeed = (Math.random() -.5)
    var borderRadius = Math.floor(Math.random()*15)
    document.body.appendChild(particleElement)
    particleElement.style.borderRadius = borderRadius + 'px'
    var red = Math.floor(Math.random() * 255)
    var green = Math.floor(Math.random() * 255)
    var blue = Math.floor(Math.random() * 255)

    var red2 = Math.floor(Math.random() * 115)
    var green2 = Math.floor(Math.random() * 115)
    var blue2 = Math.floor(Math.random() * 115)
    particleElement.style.backgroundColor=`rgb(${red}, ${green}, ${blue})`
    particleElement.style.borderColor=`rgb(${red2}, ${green2}, ${blue2})`
    particleElement.style.transform = 'translateY(50%) translateX(-50%)'
    var particle = {
        element        : particleElement,
        launchTime     : launchTime,
        startVelocityY : startVelocityY,
        startVelocityX : startVelocityX,
        startPositionX : startPositionX,
        startPositionY : startPositionY,
        spinSpeed      : spinSpeed
    }
    particles.push(particle)
}

function setRocketPositions(){
    rockets.forEach(function(rocket){
        var elapsedTime = performance.now() - rocket.launchTime
        rocket.element.style.bottom = ( rocket.startVelocityY * elapsedTime ) + (( gravity * elapsedTime * elapsedTime )/2) + 'vh'
        rocket.element.style.left = ( (rocket.startVelocityX * elapsedTime) + rocket.startPositionX ) + 'vw'
        rocket.element.style.borderRadius = ((rocket.startVelocityY + ( gravity*elapsedTime )) * 500 ) + 'px'
        var rotation = (elapsedTime * rocket.spinSpeed)
        rocket.element.style.transform = `rotateZ(${rotation}deg)`
    })
    rockets = rockets.filter(function(rocket){ 
        var elapsedTime = performance.now() - rocket.launchTime
        if ( (rocket.startVelocityY + ( gravity*elapsedTime )) < 0 ) {
            rocket.element.remove()
            var numParticles = Math.floor((Math.random()+1)*5)
            for ( var i = 0; i < numParticles; i++ ){
                launchParticle(rocket)
            }
            return false
        }
        else { return true }
    })
}

function setParticlePositions(){
    particles.forEach(function(particle){
        var elapsedTime = performance.now() - particle.launchTime
        particle.element.style.bottom = (( particle.startVelocityY * elapsedTime ) + particle.startPositionY ) + (( gravity * elapsedTime * elapsedTime )/2) + 'vh'
        particle.element.style.left = ( (particle.startVelocityX * elapsedTime) + particle.startPositionX ) + 'vw'
        var rotation = (elapsedTime * particle.spinSpeed)
        particle.element.style.transform = `rotateZ(${rotation}deg)`
    })
    particles = particles.filter(function(particle){ 
        if ( particle.element.style.bottom[0] === '-' ) {
            particle.element.remove()
            return false
        }
        else { return true }
    })
}

function render(){
    setRocketPositions()
    setParticlePositions()
    requestAnimationFrame(render)
}
render()

document.addEventListener('keydown', function(event){
    if ( event.which === 32 ){
        launchRocket()
    }
})


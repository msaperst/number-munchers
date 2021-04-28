import './Muncher.css'

function Muncher(props) {
    // let initLeft = 2;
    // let initTop = 2;

    return (
        <div ref={el => {
            if (!el) return;
            el.style.left = el.getBoundingClientRect().width * props.position.x + "px";
            el.style.top = el.getBoundingClientRect().height * props.position.y + "px";
        }}
             className="muncher"/>
    )
}

export default Muncher;
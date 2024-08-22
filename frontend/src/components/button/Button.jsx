import "./button.css"

const Button = ({text, event}) => {
    return (
        <button
            onClick={event}
            className='btn'
        >
            {text}
        </button>
    );
}

export default Button;

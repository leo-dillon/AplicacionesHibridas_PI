const Male = ({ width, height }) => {
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={ width } 
            height={ height } 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className= "icon icon-tabler icons-tabler-outline icon-tabler-gender-male"
        >
            <path 
                stroke="none" 
                d="M0 
                0h24v24H0z" 
                fill="none" 
            />
            <path 
                d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" 
            />
            <path 
                d="M19 5l-5.4 5.4" 
            />
            <path 
                d="M19 5h-5" 
            />
            <path d="M19 5v5" 
            />
        </svg>
    )
}

export default Male
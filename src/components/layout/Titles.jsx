import './../../styles/titles.css';

export default function Titles({ classname, header, sub }) {
    return (
        <div id="titles" className={`${classname} comic-box`}>
            <span id="title-header">{header}</span>
            {sub && <span id="title-sub">{sub}</span>}
        </div>
    )
}

import "../../styles/blog.css";

export default function Blog() {
    const handleBlogClick = () => {
        window.open("https://dev.to/ErickMontesDK", "_blank"); // Placeholder URL based on username
    };

    return (
        <div className="blog-screen" onClick={handleBlogClick}>
            <div className="blog-title">MY NOTES</div>
            <div className="blog-subtitle">
                Snippets, thoughts<br />
                & learnings
            </div>

            <div className="blog-doodle-button">
                READ
            </div>

        </div>
    );
}
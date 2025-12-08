export default function InfoCards({ className, children }) {
    return (
        <div className={`info-cards ${'info-cards-' + className || ''}`}>
            {children || (
                <>
                    <h1>InfoCards</h1>
                    <p>Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Esse nulla dolorum
                        unde error fuga? Enim libero quae qui
                        sed laboriosam aspernatur quibusdam,
                        distinctio facere eveniet quas ex,
                        perspiciatis, beatae ipsum.
                    </p>
                </>
            )}
        </div>
    );
}
import { Carousel } from 'react-bootstrap';
import InstaPost from '../media/insta_post';
import experiences from './../../data/experience';

export default function MobileExperience({ darkMode }) {

    return (
        <section className="mobile-section mobile-experience">
            <h2 className="mobile-section-title">Experience</h2>

            <Carousel
                interval={null}
                indicators={false}
                className={`mobile-carousel insta-carousel ${darkMode ? 'dark-mode-carousel' : ''}`}
            >
                {experiences.map((exp, index) => (
                    <Carousel.Item key={index}>
                        <div className="comic-box insta-post-mobile">
                            <InstaPost exp={exp} />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}

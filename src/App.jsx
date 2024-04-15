import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import { useSwipeable } from 'react-swipeable';
import { GalleryItem } from './components/GalleryItem/GalleryItem';

function App() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [animState, setAnimState] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const cachedImages = localStorage.getItem('images');
            if (cachedImages) {
                setImages(JSON.parse(cachedImages));
                return;
            }

            try {
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        client_id: '9mOOEhBCqbFRVRttWUK2HD7rhEr84ilJmOl5J7Bovow',
                        count: 10,
                    },
                });
                localStorage.setItem('images', JSON.stringify(response.data));
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (isZoomed) {
            document.body.classList.add('zoomed');
        } else {
            document.body.classList.remove('zoomed');
        }
        return () => {
            document.body.classList.remove('zoomed');
        };
    }, [isZoomed]);

    const moveToNextImage = () => {
        if (!isZoomed) return;
        setAnimState('smooth-next'); // Ustawienie klasy animacji dla następnego zdjęcia
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const moveToPreviousImage = () => {
        if (!isZoomed) return;
        setAnimState('smooth-prev'); // Ustawienie klasy animacji dla poprzedniego zdjęcia
        setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    const closeZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: moveToNextImage,
        onSwipedRight: moveToPreviousImage,
    });

    return (
        <article className={styles.gallery}>
            <h1 className={styles.title}>Responsive Image Gallery</h1>
            <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus luctus nulla ut porta. Fusce scelerisque ligula diam, vitae pellentesque nunc interdum vitae. Phasellus non sapien vitae augue dapibus interdum eu euismod ante. Fusce ornare, eros eget tincidunt fermentum, libero mauris facilisis enim, sed porttitor purus elit eget nisi. In blandit a neque et consectetur. Quisque justo felis, tristique eget metus eu, faucibus lobortis purus. In et viverra ex, eget efficitur ex. Duis a massa nec enim commodo suscipit. Phasellus hendrerit finibus neque, nec pretium dui lacinia sit amet. Aenean eget nisl neque. Nam eget turpis eget nulla ultrices pretium a eu nulla. Fusce quis nisl at velit efficitur fermentum. Phasellus lectus est, iaculis eu vestibulum in, pulvinar vel lacus.</p>
            <section className={styles.list}>
                {images.map((image, index) => (
                    <GalleryItem
                        key={image.id}
                        src={image.urls.regular}
                        alt={image.alt_description}
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsZoomed(true);
                        }}
                    />
                ))}
            </section>
            {isZoomed && (
                <div
                    className={styles.zoomOverlay}
                    {...swipeHandlers}>
                    <div className={styles.zoomOptions}>
                        <button
                            onClick={closeZoom}
                            className={styles.zoomClose}>
                            <span className={styles.buttonInner}>
                                <svg viewBox='0 0 512 512'>
                                    <path d='m445.2 109.2-42.4-42.4L256 213.6 109.2 66.8l-42.4 42.4L213.6 256 66.8 402.8l42.4 42.4L256 298.4l146.8 146.8 42.4-42.4L298.4 256z' />
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className={styles.zoomHolderImage}>
                        <img
                            src={images[currentIndex].urls.regular}
                            alt={images[currentIndex].alt_description}
                            className={styles.zoomedImage}
                        />
                    </div>
                    <button
                        className={`${styles.button} ${styles.buttonPrev}`}
                        onClick={moveToPreviousImage}>
                        <span className={styles.buttonInner}>
                            <svg viewBox='0 0 512 512'>
                                <path d='M318.8 445.2 129.6 256 318.8 66.8l42.4 42.4L214.4 256l146.8 146.8z' />
                            </svg>
                        </span>
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonNext}`}
                        onClick={moveToNextImage}>
                        <span className={styles.buttonInner}>
                            <svg viewBox='0 0 512 512'>
                                <path d='m193.2 445.2-42.4-42.4L297.6 256 150.8 109.2l42.4-42.4L382.4 256z' />
                            </svg>
                        </span>
                    </button>
                </div>
            )}
        </article>
    );
}

export default App;

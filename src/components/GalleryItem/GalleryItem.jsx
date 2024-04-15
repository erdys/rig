import styles from './GalleryItem.module.css';

export function GalleryItem({ src, alt, onClick }) {
    return (
        <div
            className={styles.item}
            onClick={onClick}>
            <img
                src={src}
                alt={alt}
                className={styles.galleryImage}
            />
        </div>
    );
}

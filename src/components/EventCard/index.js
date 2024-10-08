import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
    imageSrc,
    imageAlt = "image",
    date = new Date().sort((a, b) => a - b), // Assuming this is meant to be `new Date()`
    title,
    label,
    small = false,
    context = "last",
    ...props
}) => (
    <div
        data-testid="card-testid"
        className={`EventCard${small ? " EventCard--small" : ""}`}
        {...props}
    >
        <div className="EventCard__imageContainer">
            <img
                data-testid="card-image-testid"
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                aria-label={`${title} image. ${context}`}
            />
            <div className="EventCard__label">{label}</div>
        </div>
        <div className="EventCard__descriptionContainer">
            <div className="EventCard__title">{title}</div>
            <div className="EventCard__month">{getMonth(date)}</div>
        </div>
    </div>
);
EventCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    small: PropTypes.bool,
    label: PropTypes.string.isRequired,
    context: PropTypes.string,
};

EventCard.defaultProps = {
    imageAlt: "image",
    small: false,
    context: "last event",
};

export default EventCard;

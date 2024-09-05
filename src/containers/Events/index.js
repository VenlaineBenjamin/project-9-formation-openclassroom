import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtre par type sélectionné
    const filteredByType =
        data?.events.filter((event) => (type ? event.type === type : true)) ||
        [];

    // Filtre par pagination
    const paginatedEvents = filteredByType.filter(
        (event, index) =>
            (currentPage - 1) * PER_PAGE <= index &&
            PER_PAGE * currentPage > index
    );

    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };

    const pageNumber = Math.ceil(filteredByType.length / PER_PAGE);
    const typeList = Array.from(
        new Set(data?.events.map((event) => event.type))
    );

    return (
        <>
            {error && <div>An error occurred</div>}
            {data === null ? (
                "loading"
            ) : (
                <>
                    <h3 className="SelectTitle">Catégories</h3>
                    <Select
                        selection={typeList}
                        onChange={(value) =>
                            value ? changeType(value) : changeType(null)
                        }
                    />
                    <div id="events" className="ListContainer">
                        {paginatedEvents.map((event) => (
                            <Modal
                                key={event.id}
                                Content={<ModalEvent event={event} />}
                            >
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                            </Modal>
                        ))}
                    </div>
                    <div className="Pagination">
                        {Array.from({ length: pageNumber }, (_, n) => (
                            <a
                                key={`page-${n + 1}`} // Clé unique pour chaque page
                                href="#events"
                                onClick={() => setCurrentPage(n + 1)}
                            >
                                {n + 1}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default EventList;

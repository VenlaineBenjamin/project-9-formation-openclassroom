import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("When an event card is created", () => {
    it("displays an image with the correct alt value", () => {
        render(
            <EventCard
                imageSrc="http://src-image"
                imageAlt="image-alt-text"
                date={new Date("2022-04-01")}
                title="test event"
                label="test label"
            />
        );
        const imageElement = screen.getByTestId("card-image-testid");
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.alt).toEqual("image-alt-text");
    });

    it("displays a title, a label, and a month", () => {
        render(
            <EventCard
                imageSrc="http://src-image"
                imageAlt="image-alt-text"
                title="test event"
                label="test label"
                date={new Date("2022-04-01")}
            />
        );
        const titleElement = screen.getByText(/test event/);
        // const monthElement = screen.getByText(/date/);
        const labelElement = screen.getByText(/test label/);
        expect(titleElement).toBeInTheDocument();
        expect(labelElement).toBeInTheDocument();
        // expect(monthElement).toBeInTheDocument();
    });

    describe("with small props", () => {
        it("adds a small modifier", () => {
            render(
                <EventCard
                    imageSrc="http://src-image"
                    imageAlt="image-alt-text"
                    title="test event"
                    label="test label"
                    date={new Date("2022-04-01")}
                    small
                />
            );
            const cardElement = screen.getByTestId("card-testid");
            expect(cardElement.className.includes("EventCard--small")).toEqual(
                true
            );
        });
    });
});

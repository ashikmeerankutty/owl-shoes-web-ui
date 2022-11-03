import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

interface useScrollSpyParams {
    activeSectionDefault?: string;
    offsetPx?: number;
    sectionElements: HTMLElement[];
    throttleMs?: number;
}
export const useScrollSpy = ({
    activeSectionDefault = "#",
    offsetPx = 0,
    sectionElements = [],
    throttleMs = 10
}: useScrollSpyParams) => {
    const [activeSection, setActiveSection] = useState(activeSectionDefault);

    const handle = throttle(() => {
        let currentSectionId = activeSection;
        for (const section of sectionElements) {
            // Needs to be a valid DOM Element
            if (!section || !(section instanceof Element)) continue;
            // GetBoundingClientRect returns values relative to viewport
            if (section.getBoundingClientRect().top + offsetPx < 0) {
                currentSectionId = section.id;
                continue;
            }
            // No need to continue loop, if last element has been detected
            break;
        }

        setActiveSection(currentSectionId);
    }, throttleMs);

    useEffect(() => {
        window.addEventListener("scroll", handle);

        // Run initially
        handle();

        return () => {
            window.removeEventListener("scroll", handle);
        };
    }, [sectionElements, offsetPx]);

    return activeSection;
};

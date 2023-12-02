import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Membership from "@/app/components/Membership";

describe("Membership render test", () => {
    it("renders a membership card", () => {
        render(<Membership />);
        const elements = screen.getAllByText("Feature of the plan");
        expect(elements.length).toBeGreaterThan(0);
        const elements2 = screen.getAllByText("Best Deal!");
        expect(elements2.length).toBeGreaterThan(0);    
    });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FavButton from "./SetFavButton";
import { addToFavorites, removeFromFavorites } from "@/redux/animeSlice";

const mockStore = configureStore([]);

describe("FavButton", () => {
  const mockAnime = {
    id: 1,
    title: {
      english: "Test Anime",
      native: "テストアニメ"
    },
    coverImage: { large: "https://example.com/image.jpg" },
    bannerImage: "https://example.com/banner.jpg",
    episodes: 24,
    averageScore: 85,
    status: "FINISHED",
    startDate: { year: 2022, month: 1, day: 15 },
    endDate: { year: 2022, month: 6, day: 30 },
    description: "Test description",
    trailer: {
      id: "1",
      site: "YouTube",
    },
  };

  it("should render with default size", () => {
    const store = mockStore({
      anime: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "24");
    expect(svgElement).toHaveAttribute("height", "24");
  });

  it("should render with custom size", () => {
    const store = mockStore({
      anime: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} size={48} />
      </Provider>
    );

    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "48");
    expect(svgElement).toHaveAttribute("height", "48");
  });

  it("should show unfilled heart when anime is not in favorites", () => {
    const store = mockStore({
      anime: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("fill", "none");
    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  });

  it("should show filled heart when anime is in favorites", () => {
    const store = mockStore({
      anime: {
        favorites: [mockAnime]
      }
    });

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("fill", "#FF4B77");
    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  });

  it("should dispatch addToFavorites when clicked and not in favorites", () => {
    const store = mockStore({
      anime: {
        favorites: []
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Add to favorites"));
    expect(store.dispatch).toHaveBeenCalledWith(addToFavorites(mockAnime));
  });

  it("should dispatch removeFromFavorites when clicked and in favorites", () => {
    const store = mockStore({
      anime: {
        favorites: [mockAnime]
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Remove from favorites"));
    expect(store.dispatch).toHaveBeenCalledWith(removeFromFavorites(mockAnime.id));
  });

  it("should have correct button styling", () => {
    const store = mockStore({
      anime: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <FavButton animeInfo={mockAnime} />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-[#FF4B77]", "hover:cursor-pointer");
  });
});
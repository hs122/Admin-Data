import { renderHook, act} from "@testing-library/react-hooks";
import { useFetch } from "./hooks/useFetch";
import {render} from "@testing-library/react"
import { Delete } from "./assest/svg/Delete";
import { Edit } from "./assest/svg/Edit";


describe("useFetch", () => {
  it("should initialize with empty user array", () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.users).toEqual([]);
  });

  it("should initialize with number 1", () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.number).toEqual(1);
  });

  it("should update the users when API fetch is successful", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => [{ id: 1, name: "John" }],
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([{ id: 1, name: "John" }]);
  });

  it("should set error message when API fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    expect(result.current.error).toEqual("Something went wrong");
  });

  it("should update the sliceData based on number", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
        { id: 3, name: "Joe" },
        { id: 4, name: "Jack" },
        { id: 5, name: "Jill" },
        { id: 6, name: "Jim" },
        { id: 7, name: "Jake" },
        { id: 8, name: "Josh" },
        { id: 9, name: "Jasmine" },
        { id: 10, name: "Jared" },
        { id: 11, name: "Janet" },
        { id: 12, name: "Jerry" },
      ],
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    act(() => {
      result.current.setNumber(2);
    });

    expect(result.current.sliceData).toEqual([
      { id: 11, name: "Janet" },
      { id: 12, name: "Jerry" },
    ]);
  });
});

it("render icon",async()=>{
  render(<Delete/>)
})

it("render icons",async()=>{
  render(<Edit/>)
})

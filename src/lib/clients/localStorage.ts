"use client";

const serializedStateBuilder = (name: string) => {
  if (typeof window !== "undefined") {
    const serializedState = window.localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  }
};

export const loadState = (name: string) => {
  try {
    return serializedStateBuilder(name);
  } catch (err) {
    console.error("localstorage loading state error: ", err);
    return undefined;
  }
};

export const saveState = async (name: string, state: any) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem(name, serializedState);
      return serializedStateBuilder(name);
    }
  } catch (err) {
    console.error("localstorage save state error: ", err);
    return undefined;
  }
};

export const removeState = async (name: string) => {
  try {
    if (typeof window !== "undefined") {
      return window.localStorage.removeItem(name);
    }
  } catch (err) {
    console.error("localstorage remove state error: ", err);
    return undefined;
  }
};

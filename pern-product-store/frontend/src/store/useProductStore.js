import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

// Base URL will be dynamic based on the environment
const BASE_URL =
  import.meta.env.MODE == "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // product state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // Form state
  formData: {
    name: "",
    price: "",
    image: "",
  },
  setFormData: (formData) => {
    set({ formData });
  },
  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }),

  // Products state api calls
  addProduct: async (e) => {
    e.preventDefault();

    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      toast.success("Product added successfully.");

      document.getElementById("add_product_modal")?.close();
    } catch (err) {
      console.log("Error in addProduct state:", err);
      toast.error("Something went wrong while adding the product.");
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429)
        set({ error: "Rate limit exceeded", products: [] });
      else {
        set({ error: "Something went wrong", products: [] });
        console.log("Error in fetchProducts state:", err);
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully.");
    } catch (err) {
      console.log("Error in deleteProduct state:", err);
      toast.error("Something went wrong while deleting the product.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (err) {
      console.log("Error in fetchProduct state:", err);
      toast.error("Something went wrong while fetching the product.");
      set({ currentProduct: null, error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });

    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully.");
    } catch (err) {
      console.log("Error in updateProduct state:", err);
      toast.error("Something went wrong while updating the product.");
    } finally {
      set({ loading: false });
    }
  },
}));

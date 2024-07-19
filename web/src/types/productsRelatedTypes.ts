export type ProductType = {
  id: number;
  price: number;
  description?: {
    construction?: {
      main_text?: string;
      additional_text?: string;
    };
    advantages?: string[];
    finishing?: {
      covering?: {
        text?: string;
        advantages?: string[];
      };
    };
    text?: string;
  };
  have_glass?: boolean;
  orientation_choice?: boolean;
  category_id: number;
  covering_id: number;
};

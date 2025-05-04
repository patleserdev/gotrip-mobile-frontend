export interface CategorieInterface {
  _id:number
  title?: string;
}

export interface MarkerInterface {
  _id: number;
  title?: string;
  categorie: CategorieInterface | null;
  latitude: number;
  longitude: number;
  [key: string]: any; // Permet l'accès dynamique par clé
}

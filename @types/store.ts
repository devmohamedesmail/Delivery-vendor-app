export interface StoreFormValues {
  place_id?: string | null
   store_type_id?: string | null
  name?: string
  logo?: string
  banner?: string
  address?: string
  phone?: string
  start_time?: string
  end_time?: string
  latitude?: string
  longitude?: string
}


export interface StoreType {
    id: number
    name_en: string
    name_ar: string
    description: string | null
}

export interface Place {
    id: number
    name: string
    address: string
    latitude: string
    longitude: string
    createdAt: string
    updatedAt: string
    storeTypes: StoreType[]
}
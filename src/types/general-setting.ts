import z from 'zod'
import type {
  // catalogGalleryServiceSchema,
  generalSettingCatalogGalleryServiceSchema,
  generalSettingDataResponseSchema,
  generalSettingResponseSchema,
  generalSettingSchema,
  generalSettingUpdateFormDataSchema,
  generalSettingUpdateSchema,
} from '@/schemas/general-setting'

export type GeneralSetting = z.infer<typeof generalSettingSchema>

export type GeneralSettingForm = z.infer<typeof generalSettingUpdateSchema>

export type GeneralSettingResponse = z.infer<typeof generalSettingResponseSchema>

export type GeneralSettingDataResponse = z.infer<typeof generalSettingDataResponseSchema>

// export type GeneralSettingUpdateFormData = {
//   id: GeneralSetting['id'],
//   data:FormData
// }

// export type CatalogGalleryService = z.infer<typeof catalogGalleryServiceSchema>

export type CatalogGalleryServiceT = {
  id: number
  title: string
  description: string
  image: string
  active: boolean
}

export type GeneralSettingUpdateFormData = z.infer<typeof generalSettingUpdateFormDataSchema>

export type GeneralSettingCatalogGalleryServicesForm = z.infer<
  typeof generalSettingCatalogGalleryServiceSchema
>

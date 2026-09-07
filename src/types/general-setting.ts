import z from 'zod'
import type {
  catalogGalleryEventSchema,
  catalogGalleryModelSchema,
  catalogGalleryPackageSchema,
  catalogGalleryVideoSchema,
  // catalogGalleryServiceSchema,
  generalSettingCatalogGalleryServiceSchema,
  generalSettingDataResponseSchema,
  generalSettingResponseSchema,
  generalSettingSchema,
  generalSettingUpdateFormDataSchema,
  generalSettingUpdateSchema,
  informationContactSchema,
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

export type CatalogGalleryModel = z.infer<typeof catalogGalleryModelSchema>

export type CatalogGalleryEvent = z.infer<typeof catalogGalleryEventSchema>

export type CatalogGalleryVideo = z.infer<typeof catalogGalleryVideoSchema>

export type CatalogGalleryPackage = z.infer<typeof catalogGalleryPackageSchema>

export type InformationContact = z.infer<typeof informationContactSchema>

export type GeneralSettingUpdateFormData = z.infer<typeof generalSettingUpdateFormDataSchema>

export type GeneralSettingCatalogGalleryServicesForm = z.infer<
  typeof generalSettingCatalogGalleryServiceSchema
>

export type CatalogGalleryModelForm = Omit<CatalogGalleryModel, 'id'>

export type CatalogGalleryEventForm = Omit<CatalogGalleryEvent, 'id'>

export type CatalogGalleryVideoForm = Omit<CatalogGalleryVideo, 'id'>

export type CatalogGalleryPackageForm = Omit<CatalogGalleryPackage, 'id'>

export type InformationContactForm = InformationContact

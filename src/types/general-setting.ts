import z from 'zod'
import type {
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

export type GeneralSettingUpdateFormData = z.infer<typeof generalSettingUpdateFormDataSchema>

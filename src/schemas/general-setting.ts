import { z } from 'zod'
import { messageResponseSchema } from './custom.schema'

export const generalSettingSchema = z.object({
  id: z.number(),
  titleStart: z
    .string({
      invalid_type_error: '* El titulo debe ser una cadena de texto',
    })
    .min(1, { message: '* El titulo es requerido' })
    .min(5, { message: '* El titulo debe tener mas 5 caracteres' }),
  descriptionStart: z
    .string({
      invalid_type_error: '* La descripcion debe ser una cadena de texto',
    })
    .min(1, { message: '* La descripcion es requerida' })
    .min(5, { message: '* La descripcion debe tener mas 8 caracteres' }),
  // En general-setting.ts
  socialLinks: z.array(
    z.object({
      key: z.string(),
      url: z
        .string()
        .min(1, { message: '* La URL es requerida' })
        .url({ message: '* Debe ser una URL válida' }), // 👈 clave para que no explote si va vacío
    }),
  ),
  banners: z
    .array(
      z.object({
        id: z.number().optional(),
        image: z.string().min(1, 'La imagen es obligatoria'),
        active: z.boolean(),
      }),
    )
    .refine((banners) => banners.some((banner) => banner.active), {
      message: 'Debe haber al menos un banner activo.',
    }),
})

export const generalSettingUpdateSchema = generalSettingSchema.pick({
  id:true,
  titleStart: true,
  descriptionStart: true,
  socialLinks: true,
  banners: true,
})

// export const generalSettingUpdateSchema = z.object({
//    titleStart: z.string(),
//   descriptionStart:z.string(),
//   socialLinks:z.record(z.string(), z.unknown())
// })

export const generalSettingResponseSchema = generalSettingSchema.pick({
  id: true,
  titleStart: true,
  descriptionStart: true,
  socialLinks: true,
  banners: true,
})

export const generalSettingDataResponseSchema = z.object({
  generalSetting: generalSettingResponseSchema,
  success: messageResponseSchema.shape.success,
})

export const generalSettingUpdateFormDataSchema = z.object({
  id: generalSettingSchema.shape.id,
  data: generalSettingUpdateSchema.omit({id:true}),
})

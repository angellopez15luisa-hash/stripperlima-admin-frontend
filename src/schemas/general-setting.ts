import { z } from 'zod'
import { messageResponseSchema } from './custom.schema'

export const generalSettingSchema = z.object({
  id: z.number().optional(),
  titleStart: z
    .string({
      invalid_type_error: '* El titulo debe ser una cadena de texto',
    })
    .min(1, { message: '* El titulo es requerido' })
    .min(5, { message: '* El titulo debe tener mas 5 caracteres' })
    .optional(),
  descriptionStart: z
    .string({
      invalid_type_error: '* La descripcion debe ser una cadena de texto',
    })
    .min(1, { message: '* La descripcion es requerida' })
    .min(5, { message: '* La descripcion debe tener mas 8 caracteres' })
    .optional(),
  // En general-setting.ts
  socialLinks: z.array(
    z.object({
      key: z.string().optional(),
      url: z
        .string()
        .min(1, { message: '* La URL es requerida' })
        .url({ message: '* Debe ser una URL válida' })
        .optional(),
    }),
  ).optional(),
  banners: z
    .array(
      z.object({
        id: z.number().optional(),
        image: z.string().min(1, '* La imagen es obligatoria').optional(),
        active: z.boolean().optional(),
      }),
    )
    .refine((banners) => !banners || banners.some((banner) => banner.active), {
      message: '* Debe haber al menos un banner activo.',
    })
    .optional(),

   // --- NUEVOS CAMPOS DE LA SECCIÓN ARON ---
  titleAron: z
    .string({ invalid_type_error: "* El título de Aron debe ser texto" })
    .min(1, { message: "* El título de Aron es requerido" })
    .optional(),

  subtitleAron: z
    .string({ invalid_type_error: "* El subtítulo de Aron debe ser texto" })
    .min(1, { message: "* El subtítulo de Aron es requerido" })
    .optional(),
  titleEditorAron: z
    .string({ invalid_type_error: "* El titulo debe ser texto" })
    .min(1, { message: "* El titulo es requerida" })
    .optional(),
  descriptionEditorAron: z
    .string({ invalid_type_error: "* La descripción debe ser texto" })
    .min(1, { message: "* La descripción es requerida" })
    .optional(),

  listLabelsEditorAron: z
    .array(
      z.object({
        id: z.number({ message: "* El ID de la viñeta es requerido" }).optional(),
        text: z
          .string({ message: "* El texto de la viñeta es requerido" })
          .min(1, { message: "* La viñeta no puede estar vacía" })
          .optional(),
      }),
    )
    .min(1, { message: "* Debe haber al menos una viñeta" })
    .optional(),

  textHtmlEditorAron: z
    .string({ invalid_type_error: "* El contenido HTML debe ser texto" })
    .min(1, { message: "* El contenido HTML es requerido" })
    .optional(),

  galeryImagesAron: z
    .array(
      z.object({
        id: z.number({ message: "* El ID de la imagen es requerido" }).optional(),
        url: z
          .string({ message: "* La URL de la imagen debe ser texto" })
          .min(1, { message: "* La URL de la imagen es requerida" })
          .optional(),
      }),
    )
    .min(1, { message: "* Debe haber al menos una imagen en la galería" })
    .optional(),
})

export const generalSettingUpdateSchema = generalSettingSchema.pick({
  id: true,
  titleStart: true,
  descriptionStart: true,
  socialLinks: true,
  banners: true,
  titleAron: true,
  subtitleAron: true,
  titleEditorAron: true,
  descriptionEditorAron: true,
  listLabelsEditorAron: true,
  textHtmlEditorAron: true,
  galeryImagesAron: true,
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
  titleAron: true,
  subtitleAron: true,
  titleEditorAron: true,
  descriptionEditorAron: true,
  listLabelsEditorAron: true,
  textHtmlEditorAron: true,
  galeryImagesAron: true,
})

export const generalSettingDataResponseSchema = z.object({
  generalSetting: generalSettingResponseSchema,
  success: messageResponseSchema.shape.success,
})

export const generalSettingUpdateFormDataSchema = z.object({
  id: generalSettingSchema.shape.id,
  data: generalSettingUpdateSchema.omit({id:true}),
})

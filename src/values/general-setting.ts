import type {
  CatalogGalleryEventForm,
  CatalogGalleryModelForm,
  CatalogGalleryPackageForm,
  CatalogGalleryVideoForm,
  GeneralSettingCatalogGalleryServicesForm,
  GeneralSettingForm,
  InformationContactForm,
} from '@/types/general-setting'

export class GeneralSettingValue {
  static updateForm: GeneralSettingForm = {
    id: 0,
    titleStart: '',
    descriptionStart: '',
    socialLinks: [],
    banners: [],
    titleAron: '',
    subtitleAron: '',
    titleEditorAron: '',
    descriptionEditorAron: '',
    listLabelsEditorAron: [],
    textHtmlEditorAron: '',
    galeryImagesAron: [],
    titleHeaderServices: '',
    descriptionHeaderServices: '',
    catalogGalleryServices: [],
    titleHeaderModels: '',
    descriptionHeaderModels: '',
    catalogGalleryModels: [],
    titleHeaderPackages: '',
    descriptionHeaderPackages: '',
    catalogGalleryPackages: [],
    
  }

  static updateCatalogGalleryService: GeneralSettingCatalogGalleryServicesForm = {
    image: '',
    active: false,
    title: '',
    description: '',
  }

  static catalogGalleryModelForm: CatalogGalleryModelForm = {
    image: '',
    active: false,
    name: '',
    category: '',
  }

  static catalogGalleryEventForm: CatalogGalleryEventForm = {
    image: '',
    active: false,
    name: '',
    category: '',
  }

  static catalogGalleryVideoForm: CatalogGalleryVideoForm = {
    title: '',
    videoUrl: '',
    active: false,
  }

  static catalogGalleryPackageForm: CatalogGalleryPackageForm = {
    icon: '',
    active: false,
    description: '',
    title: '',
    features: [],
  }

  static informationContactForm: InformationContactForm = {
    address: '',
    phone: '',
    email: '',
    businessHours: '',
  }
}

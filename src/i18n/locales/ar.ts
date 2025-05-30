export  default {
  // Common
  common: {
    appName: 'إي-بلان',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    close: 'إغلاق',
    logout: 'تسجيل الخروج',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    submit: 'إرسال',
    back: 'رجوع',
    next: 'التالي',
    done: 'تم',
    created: 'تم الإنشاء',
    updated: 'تم التحديث',
    settings: 'الإعدادات',
    changeLanguage: 'تغيير اللغة',
    selectLanguage: 'اختر لغة',
    helpTranslate: 'ساعدنا في الترجمة',
    welcome: 'مرحبًا بك في إي-بلان',
  },

  // Auth
  auth: {
    signInTitle: 'تسجيل الدخول إلى حسابك',
    signUpTitle: 'إنشاء حساب جديد',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    name: 'الاسم الكامل',
    adminCode: 'رمز المسؤول (اختياري)',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    signInButton: 'تسجيل الدخول',
    signUpButton: 'التسجيل',
    orContinueWith: 'أو المتابعة باستخدام',
    rememberMe: 'تذكرني',
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    registerSuccess: 'تم التسجيل بنجاح',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    passwordMismatch: 'كلمات المرور غير متطابقة',
  },

  // Navigation
  nav: {
    dashboard: 'لوحة التحكم',
    todos: 'المهام',
    agenda: 'المذكرة',
    admin: 'الإدارة',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    help: 'المساعدة والدعم',
  },

  // Dashboard
  dashboard: {
    title: 'لوحة التحكم',
    welcome: 'مرحبًا بعودتك',
    stats: 'إحصائياتك',
    recentTodos: 'المهام الأخيرة',
    recentAgenda: 'المذكرات الأخيرة',
    quickAdd: 'إضافة سريعة',
    todayTasks: 'مهام اليوم',
    completedToday: 'تم إنجازها اليوم',
    upcomingTasks: 'المهام القادمة',
    emptyState: 'لا توجد أنشطة حديثة',
    viewAll: 'عرض الكل',
  },

  // Todos
  todos: {
    title: 'المهام الخاصة بي',
    addNew: 'إضافة مهمة جديدة',
    empty: 'لا توجد مهام بعد. قم بإنشاء أول مهمة!',
    markComplete: 'وضع علامة كمكتمل',
    markIncomplete: 'وضع علامة كغير مكتمل',
    deleteConfirm: 'هل أنت متأكد من حذف هذه المهمة؟',
    filters: {
      all: 'الكل',
      active: 'النشطة',
      completed: 'المكتملة',
    },
    form: {
      title: 'عنوان المهمة',
      titlePlaceholder: 'أدخل عنوان المهمة',
      dueDate: 'تاريخ الاستحقاق',
      priority: 'الأولوية',
      priorityOptions: {
        low: 'منخفضة',
        medium: 'متوسطة',
        high: 'عالية',
      },
      tags: 'الوسوم',
      tagsPlaceholder: 'أضف وسوم مفصولة بفواصل',
    },
  },

  // Agenda
  agenda: {
    title: 'مذكرتي',
    addNew: 'إضافة إدخال جديد',
    empty: 'لا توجد إدخالات بعد. قم بإنشاء أول إدخال!',
    deleteConfirm: 'هل أنت متأكد من حذف هذا الإدخال؟',
    form: {
      title: 'عنوان الإدخال',
      titlePlaceholder: 'أدخل عنوان الإدخال',
      content: 'المحتوى',
      contentPlaceholder: 'اكتب أفكارك...',
      tags: 'الوسوم',
      tagsPlaceholder: 'أضف وسوم مفصولة بفواصل',
    },
  },

  // Admin
  admin: {
    title: 'لوحة تحكم المسؤول',
    users: 'المستخدمون',
    userStats: 'إحصائيات المستخدمين',
    totalUsers: 'إجمالي المستخدمين',
    activeUsers: 'المستخدمون النشطون',
    inactiveUsers: 'المستخدمون غير النشطين',
    userTable: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      todos: 'المهام',
      agenda: 'المذكرات',
      lastActive: 'آخر نشاط',
      actions: 'الإجراءات',
    },
  },

  // Error pages
  error: {
    notFound: 'الصفحة غير موجودة',
    notFoundDesc: 'عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها.',
    goHome: 'العودة إلى الرئيسية',
    serverError: 'خطأ في الخادم',
    serverErrorDesc: 'عذرًا، حدث خطأ ما في خوادمنا.',
  },

  // Footer
  footer: {
    copyright: 'جميع الحقوق محفوظة.',
    terms: 'شروط الخدمة',
    privacy: 'سياسة الخصوصية',
    contact: 'اتصل بنا',
  },
};
 
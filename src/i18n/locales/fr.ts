export  default {
  // Common
  common: {
    appName: 'E-Plan',
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    retry: 'Réessayer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    close: 'Fermer',
    logout: 'Déconnexion',
    login: 'Connexion',
    register: 'S\'inscrire',
    submit: 'Soumettre',
    back: 'Retour',
    next: 'Suivant',
    done: 'Terminé',
    created: 'Créé',
    updated: 'Mis à jour',
    settings: 'Paramètres',
    changeLanguage: 'Changer de langue',
    selectLanguage: 'Sélectionner une langue',
    helpTranslate: 'Aidez-nous à traduire',
    welcome: 'Bienvenue sur E-Plan',
  },

  // Auth
  auth: {
    signInTitle: 'Connectez-vous à votre compte',
    signUpTitle: 'Créer un nouveau compte',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    name: 'Nom complet',
    adminCode: 'Code administrateur (optionnel)',
    forgotPassword: 'Mot de passe oublié?',
    noAccount: 'Vous n\'avez pas de compte?',
    hasAccount: 'Vous avez déjà un compte?',
    signInButton: 'Se connecter',
    signUpButton: 'S\'inscrire',
    orContinueWith: 'Ou continuer avec',
    rememberMe: 'Se souvenir de moi',
    loginSuccess: 'Connecté avec succès',
    registerSuccess: 'Inscription réussie',
    logoutSuccess: 'Déconnecté avec succès',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
  },

  // Navigation
  nav: {
    dashboard: 'Tableau de bord',
    todos: 'Tâches',
    agenda: 'Agenda',
    admin: 'Admin',
    profile: 'Profil',
    settings: 'Paramètres',
    help: 'Aide & Support',
  },

  // Dashboard
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bon retour',
    stats: 'Vos Statistiques',
    recentTodos: 'Tâches Récentes',
    recentAgenda: 'Agenda Récent',
    quickAdd: 'Ajout Rapide',
    todayTasks: 'Tâches du Jour',
    completedToday: 'Terminées Aujourd\'hui',
    upcomingTasks: 'Tâches à Venir',
    emptyState: 'Aucune activité récente',
    viewAll: 'Voir Tout',
  },

  // Todos
  todos: {
    title: 'Mes Tâches',
    addNew: 'Ajouter une tâche',
    empty: 'Pas encore de tâches. Créez votre première tâche!',
    markComplete: 'Marquer comme terminée',
    markIncomplete: 'Marquer comme non terminée',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette tâche?',
    filters: {
      all: 'Toutes',
      active: 'Actives',
      completed: 'Terminées',
    },
    form: {
      title: 'Titre de la tâche',
      titlePlaceholder: 'Entrez le titre de la tâche',
      dueDate: 'Date d\'échéance',
      priority: 'Priorité',
      priorityOptions: {
        low: 'Basse',
        medium: 'Moyenne',
        high: 'Haute',
      },
      tags: 'Tags',
      tagsPlaceholder: 'Ajouter des tags séparés par des virgules',
    },
  },

  // Agenda
  agenda: {
    title: 'Mon Agenda',
    addNew: 'Ajouter une entrée',
    empty: 'Pas encore d\'entrées. Créez votre première entrée d\'agenda!',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette entrée?',
    form: {
      title: 'Titre de l\'entrée',
      titlePlaceholder: 'Entrez le titre de l\'entrée',
      content: 'Contenu',
      contentPlaceholder: 'Écrivez vos pensées...',
      tags: 'Tags',
      tagsPlaceholder: 'Ajouter des tags séparés par des virgules',
    },
  },

  // Admin
  admin: {
    title: 'Tableau de Bord Admin',
    users: 'Utilisateurs',
    userStats: 'Statistiques Utilisateurs',
    totalUsers: 'Total Utilisateurs',
    activeUsers: 'Utilisateurs Actifs',
    inactiveUsers: 'Utilisateurs Inactifs',
    userTable: {
      name: 'Nom',
      email: 'Email',
      todos: 'Tâches',
      agenda: 'Agendas',
      lastActive: 'Dernière Activité',
      actions: 'Actions',
    },
  },

  // Error pages
  error: {
    notFound: 'Page non trouvée',
    notFoundDesc: 'Désolé, nous n\'avons pas pu trouver la page que vous cherchez.',
    goHome: 'Retourner à l\'accueil',
    serverError: 'Erreur serveur',
    serverErrorDesc: 'Désolé, quelque chose s\'est mal passé sur nos serveurs.',
  },

  // Footer
  footer: {
    copyright: 'Tous droits réservés.',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialité',
    contact: 'Contactez-nous',
  },
};
 
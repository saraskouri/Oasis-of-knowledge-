"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Users, Mail, Calendar } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Politique de confidentialité
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chez <strong>Oasis of Knowledge</strong>, votre vie privée est importante pour nous. Cette politique
            explique comment nous collectons, utilisons et protégeons vos informations personnelles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>Informations collectées</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Nous collectons uniquement les informations nécessaires pour améliorer votre expérience, comme votre
                adresse email lorsque vous vous inscrivez ou contactez notre équipe.
              </p>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Utilisation des informations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Vos informations ne sont utilisées que pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Fournir et améliorer nos services</li>
                <li>Communiquer avec vous (newsletters, support)</li>
                <li>Assurer la sécurité et la prévention des fraudes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-purple-600" />
                <span>Partage des données</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Nous ne partageons pas vos informations personnelles avec des tiers, sauf si la loi l'exige ou pour
                fournir des services tiers essentiels à notre plateforme.
              </p>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Nous mettons en place des mesures de sécurité pour protéger vos données contre tout accès non autorisé.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences via la
                popup de consentement.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-600" />
                <span>Vos droits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Vous avez le droit d'accéder, corriger ou supprimer vos données personnelles. Pour toute demande,
                contactez-nous via la page Contact.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>Modifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Nous pouvons mettre à jour cette politique. Toute modification sera publiée ici.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <p className="font-semibold">Dernière mise à jour : 16 juin 2025</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Cette politique est effective à partir de la date indiquée ci-dessus
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                Questions sur la confidentialité ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Si vous avez des questions sur cette politique de confidentialité ou sur la façon dont nous traitons vos
                données, n'hésitez pas à nous contacter.
              </p>
              <a
                href="mailto:saraskouri1@gmail.com"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>saraskouri1@gmail.com</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images"
import { ShieldAlert, Heart, Phone } from "lucide-react"
import { Profile } from "@/lib/profiles"

export default function ProfileView({ profile }: { profile: Partial<Profile> }) {
    const fallbackAvatar = placeholderImages.find(p => p.id === (profile.profileType === 'pet' ? "pet-profile" : "user-profile"));
    const avatarUrl = profile.photoUrl || fallbackAvatar?.imageUrl;
    const avatarHint = profile.photoUrl ? profile.name : fallbackAvatar?.imageHint;


    return (
        <div className="py-12 md:py-16 bg-muted/40 min-h-[calc(100vh-10rem)]">
            <div className="container max-w-3xl mx-auto px-4">
                <Card className="shadow-lg">
                    <CardHeader className="bg-primary/10 p-6 text-center rounded-t-lg border-b border-primary/20">
                         <div className="flex justify-center items-center mb-4">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                                <AvatarImage src={avatarUrl} alt={profile.name} data-ai-hint={avatarHint} />
                                <AvatarFallback>{profile.name?.substring(0, 2).toUpperCase() || 'AV'}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-3xl font-bold font-headline text-primary-foreground bg-primary rounded-lg py-1">{profile.name}</CardTitle>
                        <CardDescription className="text-lg text-foreground/80 pt-2">{profile.dob}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 grid gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                            <div className="bg-secondary p-3 rounded-lg">
                                <div className="text-sm font-semibold text-primary">{profile.profileType === 'pet' ? 'ESPECIE / RAZA' : 'TIPO DE SANGRE'}</div>
                                <div className="text-2xl font-bold text-secondary-foreground">{profile.bloodType}</div>
                            </div>
                            <div className="p-3 rounded-lg flex flex-col justify-center items-center bg-destructive/10">
                                 <ShieldAlert className="h-8 w-8 text-destructive"/>
                                 <span className="text-sm font-semibold text-destructive mt-1">ALERGIAS IMPORTANTES</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg flex items-center gap-2"><ShieldAlert className="text-destructive"/>ALERGIAS</h3>
                            <p className="text-muted-foreground bg-destructive/5 p-3 rounded-md border border-destructive/20">{profile.allergies || "No especificadas"}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Heart className="text-blue-500"/>CONDICIONES MÉDICAS</h3>
                            <p className="text-muted-foreground p-3 border rounded-md">{profile.conditions || "No especificadas"}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Phone className="text-green-500"/>CONTACTOS DE EMERGENCIA</h3>
                            <ul className="space-y-2">
                                {profile.contacts && profile.contacts.length > 0 ? profile.contacts.map(contact => (
                                    <li key={contact.name} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-md">
                                        <div>
                                            <div className="font-semibold">{contact.name} <span className="font-normal text-muted-foreground">({contact.relation})</span></div>
                                        </div>
                                        <div className="text-muted-foreground font-mono mt-1 md:mt-0">{contact.phone}</div>
                                    </li>
                                )) : (
                                    <li className="text-muted-foreground p-3 border rounded-md">No hay contactos de emergencia.</li>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

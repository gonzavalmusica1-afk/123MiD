
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images"
import { ShieldAlert, Heart, Phone } from "lucide-react"
import { Profile } from "@/lib/profiles"
import { cn } from "@/lib/utils"
import { differenceInYears, parseISO } from "date-fns"

function getAge(dob: string) {
    try {
        const birthDate = parseISO(dob);
        const age = differenceInYears(new Date(), birthDate);
        return age;
    } catch (error) {
        return null;
    }
}

function formatDate(dob: string) {
    try {
        const date = parseISO(dob);
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch(error) {
        return dob;
    }
}

export default function ProfileView({ profile, isMockup = false }: { profile: Partial<Profile>, isMockup?: boolean }) {
    const fallbackAvatar = placeholderImages.find(p => p.id === (profile.profileType === 'pet' ? "pet-profile" : "user-profile"));
    const avatarUrl = profile.photoUrl || fallbackAvatar?.imageUrl;
    const avatarHint = profile.photoUrl ? profile.name : fallbackAvatar?.imageHint;
    const age = profile.dob ? getAge(profile.dob) : null;
    const formattedDob = profile.dob ? formatDate(profile.dob) : null;


    return (
        <div className={cn(
            "py-12 md:py-16 min-h-[calc(100vh-10rem)]",
            !isMockup && "bg-muted/40"
        )}>
            <div className={cn("container max-w-3xl mx-auto", isMockup ? "px-0" : "px-4")}>
                <Card className={cn(isMockup ? "shadow-none border-none rounded-none" : "shadow-lg")}>
                    <CardHeader className={cn(
                        "p-6 text-center border-b",
                        isMockup ? "bg-transparent border-primary/10" : "bg-primary/10 border-primary/20 rounded-t-lg"
                        )}>
                         <div className="flex justify-center items-center mb-4">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                                <AvatarImage src={avatarUrl} alt={profile.name} data-ai-hint={avatarHint} />
                                <AvatarFallback>{profile.name?.substring(0, 2).toUpperCase() || 'AV'}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-3xl font-bold font-headline text-primary-foreground bg-primary rounded-lg py-1">{profile.name}</CardTitle>
                        {formattedDob && (
                            <div className="pt-2">
                                <p className="text-lg text-foreground/80">{formattedDob}</p>
                                {age !== null && <p className="text-base text-muted-foreground">{age} años</p>}
                            </div>
                        )}
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

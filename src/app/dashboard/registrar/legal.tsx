
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import PrivacyPolicyText from "@/components/legal/PrivacyPolicyText";
import TermsAndConditionsText from "@/components/legal/TermsAndConditionsText";

export default function LegalStep({ onAccept }: { onAccept: () => void }) {
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const canContinue = privacyAccepted && termsAccepted;

    return (
        <Card className="mx-auto w-full max-w-3xl">
            <CardContent className="pt-6">
                <div className="space-y-8">
                     {/* Privacy Policy */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-headline">Política de Privacidad</h2>
                        <div className="h-64 overflow-y-auto p-4 border rounded-md text-sm text-muted-foreground space-y-4">
                            <PrivacyPolicyText />
                        </div>
                        <div className="flex items-center space-x-2">
                             <Checkbox id="privacy-check" onCheckedChange={(checked) => setPrivacyAccepted(Boolean(checked))} />
                             <Label htmlFor="privacy-check" className="text-sm font-medium leading-none cursor-pointer">
                                 He leído y acepto la Política de Privacidad.
                             </Label>
                         </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-headline">Términos y Condiciones</h2>
                        <div className="h-64 overflow-y-auto p-4 border rounded-md text-sm text-muted-foreground space-y-4">
                           <TermsAndConditionsText />
                        </div>
                        <div className="flex items-center space-x-2">
                             <Checkbox id="terms-check" onCheckedChange={(checked) => setTermsAccepted(Boolean(checked))} />
                             <Label htmlFor="terms-check" className="text-sm font-medium leading-none cursor-pointer">
                                 He leído y acepto los Términos y Condiciones.
                             </Label>
                         </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                     <Button variant="outline" asChild>
                         <Link href="/dashboard">Cancelar</Link>
                     </Button>
                    <Button onClick={onAccept} disabled={!canContinue}>
                        Continuar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

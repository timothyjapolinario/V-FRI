import { NextRequest, NextResponse } from "next/server";
import { getInterpretation } from "./floodRiskIndexInterpreter";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import firebaseApp from "@/firebase/firebaseApp";
import {
  calculateCapacity,
  calculateExposure,
  calculateHazard,
  calculateVulnerability,
} from "./floodRiskCalculator";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/app/authOption";

export async function POST(req: any) {
  const session = await getServerSession(authOption);
  console.log(session?.user?.email);
  if (session?.user?.email !== "vcsms.vfri2023@gmail.com") {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const raw = await req.json();
  const body = raw["toCalculate"];
  console.log("tongina", body);
  const hazardValues = body["HAZARD"];
  const computedHazard = calculateHazard(hazardValues);

  const exposureValues = body["EXPOSURE"];
  const computedExposure = calculateExposure(exposureValues);

  const vulnerabilityValues = body["VULNERABILITY"];
  const computedVulnerability = calculateVulnerability(vulnerabilityValues);

  const capacityValues = body["CAPACITY"];
  const computedCapacity = calculateCapacity(capacityValues);

  const floodRiskIndex =
    (computedHazard * computedVulnerability * computedExposure) /
    computedCapacity;
  const interpretation = getInterpretation(floodRiskIndex);

  if (raw["shouldSave"]) {
    console.log("should save na");
    try {
      const db = getFirestore(firebaseApp);
      const docRef = await addDoc(collection(db, "floodRiskIndeces"), {
        value: floodRiskIndex,
        interpretation: interpretation,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return NextResponse.json({
    hazard: computedHazard,
    exposure: computedExposure,
    vulnerability: computedVulnerability,
    capacity: computedCapacity,
    floodRiskIndex: floodRiskIndex,
    interpretation: interpretation,
  });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }
  const isAdmin = await validateIfAdmin(session.user.email);
  console.log("IS ADMIN", isAdmin);
  if (!isAdmin) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "floodRiskIndeces");
  const docSnap = await getDocs(collectionRef);
  const floodRiskIndeces: any[] = [];
  docSnap.forEach((doc) => {
    floodRiskIndeces.push(doc.data());
  });

  return NextResponse.json({ data: floodRiskIndeces });
}

export const validateIfAdmin = async (
  emailAddress: string
): Promise<boolean> => {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "admins");
  const docSnap = await getDocs(collectionRef);
  const admins: any[] = [];
  docSnap.forEach((doc) => {
    admins.push(doc.data());
  });
  return admins.includes(emailAddress);
};

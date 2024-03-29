import { NextRequest, NextResponse } from "next/server";
import { getInterpretation } from "./floodRiskIndexInterpreter";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  setDoc,
} from "firebase/firestore";
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

  if (!session?.user?.email) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const raw = await req.json();
  const dateToday = raw["dateToday"];
  const body = raw["toCalculate"];

  const barangay = raw["barangay"];
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
      const docRef = await setDoc(doc(db, "floodRiskIndeces", barangay), {
        value: floodRiskIndex,
        interpretation: interpretation,
        capacity: computedCapacity,
        vulnerability: computedVulnerability,
        exposure: computedExposure,
        hazard: computedHazard,
        dateUpdated: dateToday,
      });

      console.log("Document written with ID: ", docRef);
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

  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "floodRiskIndeces");
  const docSnap = await getDocs(collectionRef);
  const floodRiskIndeces: any[] = [];
  docSnap.forEach((doc) => {
    floodRiskIndeces.push({ ...doc.data(), location: doc.id });
  });

  return NextResponse.json({ data: floodRiskIndeces });
}

export const validateIfAdmin = async (
  emailAddress: string | null | undefined
): Promise<boolean> => {
  if (emailAddress === null || emailAddress === undefined) {
    return false;
  }
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "admins");
  const docSnap = await getDocs(collectionRef);
  const admins: any[] = [];
  docSnap.forEach((doc) => {
    admins.push(doc.data()["emailAddress"]);
  });
  console.log(admins);
  return admins.includes(emailAddress);
};

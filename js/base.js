function checkSubmit() {
  // 物件情報のチェックボックスの値を取得
  var tokyoChecked = document.getElementById("tokyo").checked;
  var srcrcChecked = document.getElementById("srcrc").checked;
  var ageChecked = document.getElementById("age").checked;
  var stationChecked = document.getElementById("station").checked;
  var totalUnitsChecked = document.getElementById("totalUnits").checked;

  // 購入者情報の入力値を取得
  var purchaseAmount = document.getElementById("purchaseAmount").value;
  var personalfunds = document.getElementById("personalfunds").value;
  var annualIncome = document.getElementById("annualIncome").value;
  var familyComposition = document.getElementById("familyComposition").value;
  var otherIncome = document.getElementById("otherIncome").value;
  var Housingloan = document.getElementById("Housingloan").value;
  var rent = document.getElementById("rent").value;
  var OtherBorrowing = document.getElementById("OtherBorrowing").value;
  // var Partner = document.getElementById("Partner").value;

  // 物件情報のチェック状態を確認し、購入者情報の表示/非表示を切り替える
  if (tokyoChecked && srcrcChecked && ageChecked && stationChecked && totalUnitsChecked) {
    document.getElementById("buyerInfoSection").style.display = "block";
  } else {
    document.getElementById("buyerInfoSection").style.display = "none";
    return;
  }

  // 購入者情報の入力値が全て入力された場合のみ、確定ボタンを有効化する
  if (tokyoChecked && srcrcChecked && ageChecked && stationChecked && totalUnitsChecked && purchaseAmount !== "" && personalfunds !== "" && familyComposition !== "" && annualIncome !== "" && otherIncome !== "" && Housingloan !== "" && rent !== "" && OtherBorrowing !== "" ) {
    var el = document.getElementById("submitBtn")
    el.disabled = false;
    el.style.backgroundColor = "#007bff"
    el.style.color = "#fff"
  } else {
    var el = document.getElementById("submitBtn")
    el.disabled = true;
    el.removeAttribute("style");
  }
}

function submitForm() {

  // フォームのデータを取得
  // 購入金額
  var purchaseAmount = document.getElementById("purchaseAmount").value * 10000;
  // 年収
  var annualIncome = document.getElementById("annualIncome").value * 10000;
  // 自己資金額
  var personalfunds = document.getElementById("personalfunds").value * 10000;
  // 家族構成
  var familyComposition = document.getElementById("familyComposition").value;
  // その他の収入
  var otherIncome = document.getElementById("otherIncome").value * 10000;
  // 住宅ローン 毎月返済額
  var Housingloan = document.getElementById("Housingloan").value * 10000;
  // 家賃
  var rent = document.getElementById("rent").value * 10000;
  // その他の借入 毎月返済額
  var OtherBorrowing = document.getElementById("OtherBorrowing").value * 10000;

  if(otherIncome < 0 || personalfunds < 0 || Housingloan < 0 || rent < 0 || OtherBorrowing < 0 ){
    alert("マイナスの値は受け付けることができません。");
    return false;
  }

  // 借入金額（購入金額-自己資金額)：pv
  // 融資金利：ir
  // 返済期間（月数）:np
  var pv = purchaseAmount - personalfunds;
  var ir = 1.7;
  var np = 30 * 12;

  // 支出
  // １．購入金額に対する月々の返済額
  var repaymentAmount = Math.floor((pv * (ir / 100 / 12) * (Math.pow(1 + (ir / 100 / 12), np))) / (Math.pow(1 + (ir / 100 / 12), np) -1));

  // ２．生活費概算 (10万 + 同居家族人数 * 5万)
  var Costliving = 100000 + familyComposition * 50000

  // 収入
  // １．年収*0.7/12（年収から計算した月の支払い余力）
  var annualcapacity = Math.floor(annualIncome * 0.7 / 12)

  // ２．その他収入*0.6/12（その他収入から計算した月の支払い余力）
  var othercapacity = Math.floor(otherIncome * 0.6 / 12)

  // 条件を記述
  // 月の支出 = 支出１＋支出２＋住宅ローン 毎月返済額＋家賃＋その他の借入 毎月返済額
  var expenditure = repaymentAmount + Costliving + Housingloan + rent + OtherBorrowing
  // 月の収入 = 収入１＋収入２
  var Income = annualcapacity + othercapacity

  // モーダルに内容をセット
  // 月額収入余力
  document.getElementById("td-Income1").textContent = Income.toLocaleString()
  // 月々の返済額
  document.getElementById("td-repaymentAmount").textContent= repaymentAmount.toLocaleString()
  // 生活費概算
  document.getElementById("td-Costliving").textContent= Costliving.toLocaleString()
  // 家賃
  document.getElementById("td-rent").textContent= rent.toLocaleString()
  // 住宅ローン返済額
  document.getElementById("td-Housingloan").textContent= Housingloan.toLocaleString()
  // その他借入返済額
  document.getElementById("td-OtherBorrowing").textContent= OtherBorrowing.toLocaleString()
  // 収入
  document.getElementById("td-Income2").textContent= Income.toLocaleString()
  // 支出
  document.getElementById("td-expenditure").textContent= expenditure.toLocaleString()
  // 月額返済余力
  document.getElementById("td-result").textContent= (Income - expenditure).toLocaleString()

  if (expenditure > Income) {
    document.getElementById("danger").style.display = "block";
    document.getElementById("success").style.display = "none";
  }
  else{
    document.getElementById("success").style.display = "block";
    document.getElementById("danger").style.display = "none";
  }

  // 結果モーダルの表示
  const Modal = new bootstrap.Modal(document.getElementById('modal-result'));
  Modal.show();

}
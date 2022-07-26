package matthias.expense_tracker.purchases;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.model.PurchaseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Transactional
@Service
class PurchasesService {

    private final PurchasesRepository purchasesRepository;
    private final PurchasesMapper purchasesMapper;
    private final EntityManager entityManager;

    public PurchaseDto addPurchases(PurchaseDto purchaseDto) {
        PurchaseEntity savedPurchase = purchasesRepository.saveAndFlush(purchasesMapper.fromDto(purchaseDto));
        entityManager.refresh(savedPurchase);
        return purchasesMapper.toDto(savedPurchase);
    }
}
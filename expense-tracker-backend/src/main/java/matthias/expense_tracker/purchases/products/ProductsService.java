package matthias.expense_tracker.purchases.products;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
class ProductsService {

    private final ProductsRepository productsRepository;

    public List<String> getProductNames(String query) {
        return productsRepository.findAllByNameContainingIgnoreCase(query)
                .stream()
                .map(ProductEntity::getName)
                .distinct()
                .toList();
    }
}
